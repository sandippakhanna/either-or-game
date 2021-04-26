from django.db import models

class Question(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    firstOption = models.CharField(max_length=100, blank=False, null=False)
    secondOption = models.CharField(max_length=100, blank=False, null=False)
    firstOptionVoteCount = models.IntegerField(default=0)
    secondOptionVoteCount = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)
        
class Report(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=False, blank=False)
    reportText = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.reportText

    