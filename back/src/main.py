#!/usr/bin/env python
import uvicorn
from fastapi import FastAPI


app = FastAPI()

# TODO: export routes to a proper router
#from routes import the_router

import datetime
from uuid import UUID, uuid4
from typing import Sequence, Optional, Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from db import get_db, UniqueConstratintViolation
from core import Traits, User, make_new_user 
from repositories import UserRepository


the_router = APIRouter()


def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

# --------------------------------------------------
# TODO: delete this and do some progress in the lib
import pydantic
import typing
def viewmodel(domain_model: "any", omit_fields: Sequence[str] = ()):
    def class_decorator(cls):
        class MetaMeta(type(pydantic.BaseModel)):
            def __new__(_, __, ___, original_dict):
                    base = domain_model.__pydantic_model__

                    dct = {
                        "__module__": cls.__module__,
                        "__qualname__": cls.__qualname__,
                    }
                    if hasattr(cls, "Config"):
                        ...
                    else:
                        class Config:
                            orm_mode = True

                        dct["Config"] = Config

                    _initial_annotations = {}

                    for x in omit_fields:
                        _initial_annotations[x] = typing.Union[typing.Any, type(None)]

                    for annotation_name, annotation in base.__annotations__.items():
                        if hasattr(annotation, "__pydantic_model__"): # is pydantic model
                            t = globals().get(f"{annotation.__qualname__}ViewModel")

                            if t and annotation is t.__domain_model__:
                                _initial_annotations[annotation_name] = t

                    if hasattr(cls, "__annotations__"):
                        _initial_annotations.update(cls.__annotations__)

                    dct["__annotations__"] = _initial_annotations

                    original_dict.pop("__module__")
                    original_dict.pop("__qualname__")

                    # avoid unnecessary calls to self
                    _meta = type(pydantic.BaseModel)
                    bases = (base, cls)

                    original_dict.update(dct)
                    _dict = original_dict

                    return super().__new__(_meta, cls.__qualname__, bases, _dict)

        class ResultCls(metaclass=MetaMeta):
            __domain_model__ = domain_model

            def dict(self, *args, **kwargs):
                kwargs["exclude"] = set(omit_fields)
                return super().dict(*args, **kwargs)

        return ResultCls
    return class_decorator
# --------------------------------------------------

@viewmodel(Traits)
class TraitsViewModel:
    pass

@viewmodel(User)
class UserViewModel:
    pass

@viewmodel(User, omit_fields={"uuid"})
class UserCreateViewModel:
    pass

@the_router.post("/", response_model=UserViewModel, status_code=201)
def create(data: UserCreateViewModel, r: UserRepository = Depends(get_user_repository)):
    new_user = make_new_user(data.dict())

    try:
        with r.write() as r:
            r.add(new_user)
    except Exception as e:
        # TODO: fix this PYTHONPATH madness and put UniqueConstratintViolation instead of generic Exception
        # TODO: make this simmilar to the Pydantic formatter - maybe even provide a helper to generate those formats easier
        # TODO: embedd this stripping logic into error
        # TODO: make it appear in the documentation
        # TODO: validate this eagerly
        violation_column = e.args[0].split("users.")[1]
        raise HTTPException(status_code=403, detail=f"{violation_column} is already taken")

    return new_user


app.include_router(the_router, prefix="/users")


if __name__ == "__main__":
    uvicorn.run(app, port=8000, host="0.0.0.0")
