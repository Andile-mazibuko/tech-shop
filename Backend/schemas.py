from pydantic import BaseModel

class UserSchema(BaseModel):
    first_name: str
    last_name: str
    password: str
    role: str
    email: str

class LogInSchema(BaseModel):
    email: str
    password: str
