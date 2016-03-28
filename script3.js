var myTable = document.getElementById('Mytable');
var selectedTd;
var lit = ['0','A','B','C','D','E','F','G','H'];

myTable.onclick = function(event)
{
  var target = event.target;

  while (target != this) {
    var r = target.parentElement.rowIndex;
    var c = target.cellIndex;
      //alert(r+"  :"+c);
      //alert((target.tagName == 'TD') && ( (r>0) && (c>0)));
    if (target.tagName == 'TD' && r>0 && c>0 )
    {
        highlight(target);
        printSelected();
      return;
    }
    target = target.parentNode;
  }
}

function highlight(node) 
{
  if (selectedTd) {
    selectedTd.classList.remove('highlight');
  }
    selectedTd = node;
    selectedTd.classList.add('highlight');
}

function printSelected(){
    var r = selectedTd.parentElement.rowIndex;
    var c = selectedTd.cellIndex;
    var cl = lit[c];
    document.getElementById('log').innerHTML+=' ' + cl + r + ', ';   
}

window.onkeydown=function(event){
    switch(event.keyCode){
        case 37:
            var r = selectedTd.parentElement.rowIndex;
            var c = selectedTd.cellIndex;
            var cnew = c - 1;
            if(c <= 1){cnew = 1}
            var newCell = myTable.rows[r].cells[cnew];
            highlight(newCell);
            if(c > 1)printSelected();
            break;
        case 38:
            var r = selectedTd.parentElement.rowIndex;
            var c = selectedTd.cellIndex;
            var rnew = r - 1;
            if(r <= 1){rnew = 1}
            var newCell = myTable.rows[rnew].cells[c];
            highlight(newCell);
            if(r > 1)printSelected();
            break;
        case 39:
            var r = selectedTd.parentElement.rowIndex;
            var c = selectedTd.cellIndex;
            var cnew = c + 1;
            if(c >= 8){cnew = 8}
            var newCell = myTable.rows[r].cells[cnew];
            highlight(newCell);
            var cl = lit[cnew];
            if(c < 8)printSelected();
            break;
        case 40:
            var r = selectedTd.parentElement.rowIndex;
            var c = selectedTd.cellIndex;
            var rnew = r + 1;
            if(r >= 8){rnew = 8}
            var newCell = myTable.rows[rnew].cells[c];
            highlight(newCell);
            var cl = lit[c];
            if(r < 8)printSelected();
            break;            
    }
}