from rest_framework import viewsets
from core.models import Document
from core.document.api.serializers import DocumentSerializer
from django_filters.rest_framework import DjangoFilterBackend


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user_id']
