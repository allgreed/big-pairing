import uuid
from typing import Sequence
from contextlib import contextmanager

from sqlalchemy import Column, Integer, Float, String, Date, Enum
from src.db import Base, UUID
from src.core import User


class SqlUser(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    uuid = Column(UUID(), nullable=False, index=True, unique=True)

    #date = Column(Date, nullable=False)
    ## TODO: how to handle nested things sensibly?
    #location_latitude = Column(Float, nullable=False)
    #location_longitude = Column(Float, nullable=False)
    #weather_temperature_celcius = Column(Float, nullable=False)

    #kind = Column(Enum(UserKind, values_callable=lambda obj: [e.value for e in obj]), nullable=False)
    #people_count = Column(Integer, nullable=False)
    #secret_digest = Column(TheSecret.SqlDbType, nullable=False)

    #@classmethod
    #def from_core(cls, e: User) -> "SqlUser":
    #    return cls(uuid=e.uuid.bytes,
    #        date=e.date,
    #        location_latitude = e.location.latitude,
    #        location_longitude = e.location.longitude,
    #        weather_temperature_celcius = e.weather.temperature_celcius,
    #        kind = e.kind,
    #        people_count = e.people_count,
    #        secret_digest = TheSecret.db_from_core(e.secret_digest),
    #        )

    #def to_core(self) -> User:
    #    return User(
    #           uuid=uuid.UUID(bytes=self.uuid),
    #           date=self.date,
    #           location=Location(latitude=self.location_latitude, longitude=self.location_longitude),
    #           weather=Weather(temperature_celcius=self.weather_temperature_celcius),
    #           people_count=self.people_count,
    #           secret_digest=TheSecret.core_from_db(self.secret_digest),
    #           kind=self.kind,
    #        )



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
            self.db.commit()
