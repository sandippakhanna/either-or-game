from django.urls import path
from . import views

urlpatterns = [
    path('api/random-question/', views.RandomQuestionView.as_view(), name='randomQuestion'),
    path('api/post-question/', views.PostQuestionView.as_view(), name='postQuestion'),
    path('api/upvote-option/<str:pk>/', views.UpVoteOption.as_view(), name='upvoteOption'),
    path('api/post-report/', views.PostReportView.as_view(), name='postReport'),
]
