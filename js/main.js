document.addEventListener("DOMContentLoaded", function(event) {
  var editInput =  document.createElement('input'),
      inputValue = '',
      sortedClass = 'sorted',
      deleteBtn = document.getElementsByClassName('delete'),
      ths = Array.prototype.slice.call(document.getElementsByTagName('th')),
      tableData = document.getElementsByTagName('tbody').item(0),
      rowData = tableData.getElementsByTagName('tr'),
      hasClass = function (elements, className) {
        for (var i = 0; i < elements.length; i++) {
          if (elements[i].className === className) return true;
        }

        return false;
      },
      removeClass = function (elements) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].setAttribute('class', '');
        }

        return false;
      },
      removeRow = function (elements) {
        var i = elements.length; 

        while (i--) {

          if(elements[i].getElementsByTagName('input')[0].checked) {
            elements[i].parentNode.removeChild(elements[i]);
          }

        }

        return false;
      },
      sortArray = function (a, b) {
        var nameA = a[0].toLowerCase(),
            nameB = b[0].toLowerCase();

        if (nameA < nameB) return -1;

        if (nameA > nameB) return 1;

        return 0; 
      },
      sortTable = function (element) {
        var store = [],
            i,
            row,
            sortTr;

        for (i = 0; i < tableData.rows.length; i++) {
          row = tableData.rows[i];
          sortTr = row.cells[ths.indexOf(element)].innerText;
          store.push([sortTr, row]);
        }

        store.sort(sortArray);

        if (hasClass(ths, sortedClass)) {
          removeClass(ths);
          store.reverse();
        } else {
          removeClass(ths);
          element.setAttribute('class', sortedClass);
        }

        for (i = 0; i < store.length; i++) {
          tableData.appendChild(store[i][1]);
        }

        store = null;
      };

  editInput.setAttribute('type', 'text');
  editInput.onblur = function () {
    var td = this.parentNode;

    td.removeChild(this);
    td.innerHTML = this.value;
  };

  document.querySelector('body').addEventListener('dblclick', function(event) {
    var curElement = event.target;

    if (curElement.tagName.toLowerCase() === 'td') {
      inputValue = curElement.innerText;
      curElement.innerText ='';
      editInput.value = inputValue;
      curElement.appendChild(editInput);
      editInput.focus();
    };

  });

  document.querySelector('body').addEventListener('click', function(event) {
    var curElement = event.target;

    if (curElement.tagName.toLowerCase() === 'th') {
      sortTable(curElement);
    };
  });

  document.getElementsByTagName('button')[0].addEventListener('click', function(){
    removeRow(rowData);
  });
});