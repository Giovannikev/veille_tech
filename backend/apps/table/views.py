from django.shortcuts import render, get_object_or_404, redirect
from .models import Table
from .forms import TableForm
from django.db.models import  Sum


def table_list(request):
    tables = Table.objects.all()
    return render(request, 'table/table_list.html', {'tables': tables})


def table_edit(request, pk):
    table = get_object_or_404(Table, pk=pk)
    if request.method == "POST":
        form = TableForm(request.POST, instance=table)
        if form.is_valid():
            form.save()
            return redirect('table_list')
    else:
        form = TableForm(instance=table)
    return render(request, 'table/table_edit.html', {'form': form})


# Create your views here.
def table_create(request):
    if request.method == "POST":
        form = TableForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('table_list')
    else:
        form = TableForm()
    return render(request, 'table/table_create.html', {'form': form})


def table_delete(request, pk):
    table = get_object_or_404(Table, pk=pk)
    if request.method == 'POST':
        table.delete()
        return redirect('table_list')
    return render(request, 'table/table_del.html', {'table': table})


def table_count(request):
    table_count = Table.objects.values('type_table', 'statut').annotate(sum_nb_place=Sum('nb_place'))
    return render(request, 'table/table_count.html', {'table_counts': table_count})
