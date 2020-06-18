from uuid import UUID, uuid4
from enum import Enum

from pydantic.dataclasses import dataclass
from pydantic import conint, constr


TraitPercentile = conint(ge=0, le=100)
# TODO: see the link
# https://pydantic-docs.helpmanual.io/usage/types/#pydantic-types
# TODO: fix nix pypi package installation
Email = str


class Sex(str, Enum):
    Male = "Male"
    Female = "Female"


@dataclass
class Traits:
    extroversion: TraitPercentile
    neuroticism: TraitPercentile
    agreeableness: TraitPercentile
    conscientiousness: TraitPercentile
    openness_to_experience: TraitPercentile


@dataclass
class User:
    uuid: UUID
    nickname: str
    email: Email       
    sex: Sex
    traits: Traits


def make_new_user(data: dict):
    uuid = uuid4()

    return User(**data, uuid=uuid)
