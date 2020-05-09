from dataclasses import dataclass
from enum import Enum, auto

# TODO: trait score, between 0th and 100th percentile
TraitPercentile = int
# TODO: here we go again
Email = str

class Sex(Enum):
    Male = auto()
    Female = auto()


@dataclass
class Traits:
    extroversion: TraitPercentile
    neuroticism: TraitPercentile
    agreeableness: TraitPercentile
    conscientiousness: TraitPercentile
    openness_to_experience: TraitPercentile


# TODO: entity - add id
class Account:
    def __init__(self, email: Email) -> None:
        self.email = email


# TODO: entity - add id
class Person:
    def __init__(self, nickname: str, sex: Sex, traits: Traits, account: Account) -> None:
        self.nickname = nickname
        self.sex = sex
        self.traits = traits
        # TODO: break this - use id
        self.account = account

    def __repr__(self) -> str:
        return f"{self.nickname}, {self.sex}, {self.traits}, {self.account}"


import json
from dataclasses import asdict

class PersonRepository():
    def store(self, p: Person) -> str:
        p_data = {
            # TODO: rule of Demeter, heh
            "email": p.account.email,
            "nickname": p.nickname,
            "sex": p.sex.name,
            "traits": asdict(p.traits)
        }

        return json.dumps(p_data)

