from rest_framework import serializers
from .models import Question, Report

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['firstOption', 'secondOption', 'firstOptionVoteCount', 'secondOptionVoteCount']
