from django.shortcuts import render
from django.http import Http404
from .serializers import QuestionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import random
from .models import Question, Report

class RandomQuestionView(APIView):
    # get a random question
    def get(self, request):
        questions = Question.objects.filter(active=True)
        randomQuestion = random.choice(questions)
        serializer = QuestionSerializer(randomQuestion)
        return Response(serializer.data)

class PostQuestionView(APIView):
    # Post a new question
    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpVoteOption(APIView):
    # Upvote a option, 1 - firstOption, 2 - secondOption
    def put(self, request, pk):
        try:
            question = Question.objects.get(pk=pk)
            # print(question)
        except Question.DoesNotExist:
            raise Http404
        option = request.data['option']
        # print(option)
        if option == 1:
            question.firstOptionVoteCount += 1
            question.save()
            return Response({"success": True, "msg":"First Option Voted Up"})
        elif option == 2:
            question.secondOptionVoteCount += 1
            question.save()
            return Response({"success": True, "msg":"Second Option Voted Up"})
        return Response({"success": False, "errors":"Provide a valid option"})

class PostReportView(APIView):

    def post(self, request):
        question_id = request.data['question']
        reportText = request.data['reportText']
        try:
            question = Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            raise Http404
        
        if reportText.strip() != '':
            Report.objects.create(question=question, reportText=reportText)
            return Response({'success': True, 'msg': "Report Successfully Submitted."}, status=status.HTTP_201_CREATED)

        return Response({'success': False, 'errors': "Report Text Should not be empty"}, status=status.HTTP_400_BAD_REQUEST)