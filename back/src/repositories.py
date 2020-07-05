import re
import uuid
from typing import Sequence, Optional
from contextlib import contextmanager

from sqlalchemy import Column, Integer, Float, String, Date, Enum, exc
from src.db import Base, UUID, UniqueConstratintViolation
from src.core import User, Sex, Traits


class SqlUser(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    uuid = Column(UUID(), nullable=False, index=True, unique=True)

    nickname = Column(String(length=50), nullable=False, unique=True)
    email = Column(String(length=255), nullable=False, unique=True)
    sex = Column(Enum(Sex, values_callable=lambda obj: [e.value for e in obj]), nullable=False)

    # TODO: add trait constraints
    trait_extroversion = Column(Integer, nullable=False)
    trait_neuroticism = Column(Integer, nullable=False)
    trait_agreeableness = Column(Integer, nullable=False)
    trait_conscientiousness = Column(Integer, nullable=False)
    trait_openness_to_experience = Column(Integer, nullable=False)

    @classmethod
    def from_core(cls, u: User, id: Optional[int] = None) -> "SqlUser":
        result = cls(uuid=u.uuid.bytes,
            nickname=u.nickname,
            email=u.email,
            sex=u.sex,
            trait_extroversion = u.traits.extroversion,
            trait_neuroticism = u.traits.neuroticism,
            trait_agreeableness = u.traits.agreeableness,
            trait_conscientiousness = u.traits.conscientiousness,
            trait_openness_to_experience = u.traits.openness_to_experience,
            )
        if id is not None:
            result.id = id

        return result

    def to_core(self) -> User:
        traits = Traits(
                extroversion=self.trait_extroversion,
                neuroticism=self.trait_neuroticism,
                agreeableness=self.trait_agreeableness,
                conscientiousness=self.trait_conscientiousness,
                openness_to_experience=self.trait_openness_to_experience,
            )

        return User(
                uuid=uuid.UUID(bytes=self.uuid),
                nickname=self.nickname,
                email=self.email,
                sex=self.sex,
                traits=traits,
            )


class QueryUserRepository:
    def __init__(self, db):
        self.db = db


class CommandUserRepository(QueryUserRepository):
    def __init__(self, db):
        self.db = db

    def add(self, e: User):
            self.db.add(SqlUser.from_core(e))


class UserRepository:
    def __init__(self, db):
        self.db = db

    @contextmanager
    def read(self):
        yield QueryUserRepository(self.db)

    @contextmanager
    def write(self):
        try:
            yield CommandUserRepository(self.db)
        finally:
            try:
                self.db.commit()
            except exc.IntegrityError as e:
                match = re.match(r"UNIQUE constraint failed: (.*)", str(e.orig))
                if match is not None:
                    raise UniqueConstratintViolation(match.group(1))
                else:
                    raise
