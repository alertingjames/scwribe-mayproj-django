from django.db import models

# Create your models here.

class Member(models.Model):
    admin_id = models.CharField(max_length=11)
    name=models.CharField(max_length=50)
    email = models.CharField(max_length=80)
    password = models.CharField(max_length=30)
    terms = models.CharField(max_length=5)
    role = models.CharField(max_length=20)
    company = models.CharField(max_length=50)

class ComMember(models.Model):
    adminID = models.CharField(max_length=11)
    name=models.CharField(max_length=50)
    email = models.CharField(max_length=80)
    password = models.CharField(max_length=30)
    terms = models.CharField(max_length=5)
    company = models.CharField(max_length=50)

class Talker(models.Model):
    name=models.CharField(max_length=50)
    email = models.CharField(max_length=80)
    password = models.CharField(max_length=30)
    company = models.CharField(max_length=50)
    callreg = models.CharField(max_length=5)
    link = models.CharField(max_length=500)

class TalkingRoom(models.Model):
    talker1=models.CharField(max_length=11)
    talker2 = models.CharField(max_length=11)
    roomlink = models.CharField(max_length=500)

class Group(models.Model):
    talker_id = models.CharField(max_length=11)
    talker_name = models.CharField(max_length=50)
    name=models.CharField(max_length=50)
    date = models.CharField(max_length=50)

class Note(models.Model):
    talker = models.CharField(max_length=11)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=80)
    company = models.CharField(max_length=50)
    note = models.CharField(max_length=500)
    lang = models.CharField(max_length=50)
    invite = models.CharField(max_length=50)
    group = models.CharField(max_length=50)
    start_time = models.CharField(max_length=50)
    end_time = models.CharField(max_length=50)
    urgency = models.CharField(max_length=50)
    topic = models.CharField(max_length=500)
    summary = models.CharField(max_length=500)
    callofaction = models.CharField(max_length=500)


class Attendee(models.Model):
    note_id = models.CharField(max_length=11)
    talker = models.CharField(max_length=11)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=80)
    company = models.CharField(max_length=50)
    note = models.CharField(max_length=500)
    lang = models.CharField(max_length=50)
    invite = models.CharField(max_length=50)





















