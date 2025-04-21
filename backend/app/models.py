from datetime import datetime , timezone
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from .database import Base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, nullable=True) #nullable=True purely for debugging, change when login page is done
    hashed_password = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=True)
    role = Column(String)

    sent_messages = relationship("Message", foreign_keys="[Message.sender_id]", back_populates="sender")
    received_messages = relationship("Message", foreign_keys="[Message.recipient_id]", back_populates="recipient")
    games_as_student = relationship("Game", foreign_keys="[Game.student_id]", back_populates="student")
    games_as_mentor = relationship("Game", foreign_keys="[Game.mentor_id]", back_populates="mentor")
    games_won = relationship("Game", foreign_keys="[Game.winner_id]", back_populates="winner")

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), index=True, primary_key=True)
    mentor_id = Column(Integer, ForeignKey("users.id"), index=True, primary_key=True)
    winner_id = Column(Integer, ForeignKey("users.id"), index=True, primary_key=True)
    timestamp = Column(DateTime, default=datetime.now(timezone.utc))

    student = relationship("User", foreign_keys=[student_id], back_populates="games_as_student")
    mentor = relationship("User", foreign_keys=[mentor_id], back_populates="games_as_mentor")
    winner = relationship("User", foreign_keys=[winner_id], back_populates="games_won")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, autoincrement=True) 
    sender_id = Column(Integer, ForeignKey("users.id"), index=True)
    recipient_id = Column(Integer, ForeignKey("users.id"), index=True)
    content = Column(String)
    timestamp = Column(DateTime, default=datetime.now(timezone.utc))

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_messages")
    recipient = relationship("User", foreign_keys=[recipient_id], back_populates="received_messages")