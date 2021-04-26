from rest_framework import serializers
from .models import Question, Report

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'title', 'firstOption', 'secondOption', 'firstOptionVoteCount', 'secondOptionVoteCount']
