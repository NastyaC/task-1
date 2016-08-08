document.addEventListener("DOMContentLoaded", function(event) {
  var editInput =  document.createElement('input');
  var inputValue = '';
  var sortedClass = 'sorted';
  var table = document.getElementsByTagName('table').item(0);
  var tableHeadElements = Array.prototype.slice.call(document.getElementsByTagName('th'));
  var tableData = document.getElementsByTagName('tbody').item(0);
  var rowData = tableData.getElementsByTagName('tr');
  var hasClass = function (elements, className) {
        for (var i = 0; i < elements.length; i++) {
          if (elements[i].className === className) return true;
        }

        return false;
      };
  var removeClass = function (elements) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].setAttribute('class', '');
        }

        return false;
      };
  var removeRow = function (elements) {
        for (var i = elements.length - 1; i >= 0; i--) {
          if(elements[i].getElementsByTagName('input')[0].checked) {
            elements[i].parentNode.removeChild(elements[i]);
          }
        }

        return false;
      };
  var sortArray = function (element1, element2) {
        var nameElement1 = element1[0].toLowerCase();
        var nameElement2 = element2[0].toLowerCase();

        if (nameElement1 < nameElement2) return -1;

        if (nameElement1 > nameElement2) return 1;

        return 0; 
      };
  var sortTable = function (element) {
        var elementsStore = [];
        var i;
        var row;
        var sortTr;

        for (i = 0; i < tableData.rows.length; i++) {
          row = tableData.rows[i];
          sortTr = row.cells[tableHeadElements.indexOf(element)].innerText;
          elementsStore.push([sortTr, row]);
        }

        elementsStore.sort(sortArray);

        if (hasClass(tableHeadElements, sortedClass)) {
          removeClass(tableHeadElements);
          elementsStore.reverse();
        } else {
          removeClass(tableHeadElements);
          element.setAttribute('class', sortedClass);
        }

        for (i = 0; i < elementsStore.length; i++) {
          tableData.appendChild(elementsStore[i][1]);
        }
      };

  editInput.setAttribute('type', 'text');
  editInput.onblur = function () {
    var td = this.parentNode;

    td.removeChild(this);
    td.innerHTML = this.value;
  };

  table.addEventListener('dblclick', function(event) {
    var curElement = event.target;

    if (curElement.tagName.toLowerCase() === 'td') {
      inputValue = curElement.innerText;
      curElement.innerText ='';
      editInput.value = inputValue;
      curElement.appendChild(editInput);
      editInput.focus();
    }

  });

  table.addEventListener('click', function(event) {
    var curElement = event.target;

    if (curElement.tagName.toLowerCase() === 'th') {
      sortTable(curElement);
    }
  });

  document.getElementById('delete').addEventListener('click', function(){
    removeRow(rowData);
  });
});