from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
import ollama

# Serializer pour valider les données d'entrée
class ChatbotPromptSerializer(serializers.Serializer):
    prompt = serializers.CharField(required=True)

class ChatbotAPI(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ChatbotPromptSerializer(data=request.data)
        if serializer.is_valid():
            prompt = serializer.validated_data['prompt']
            try:
                stream = ollama.chat(
                    model='llama3',
                    messages=[{'role': 'user', 'content': prompt}],
                    stream=True,
                )
                
                # Récupérer toutes les données du flux
                response_content = ""
                for response in stream:
                    response_content += response['message']['content']
                
                if response_content:
                    return Response({'response': response_content}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'No response from chatbot'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
