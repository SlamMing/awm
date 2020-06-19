from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def test_page(request, *args, **kwargs):
    #return render(request, "index.html", context={"content": "Prova dinamica"}, status=200)
    data = {
        "prova": "se mi edi funziona",
    }
    return JsonResponse(data)
