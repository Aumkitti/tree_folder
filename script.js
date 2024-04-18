document.addEventListener("DOMContentLoaded", function () {
  var folderTree = document.getElementById("folderTree");
  var addFolderButton = document.getElementById("addFolderButton");
  var addFileButton = document.getElementById("addFileButton");
  var deleteButton = document.getElementById("deleteButton");

  // Function to prompt for folder name
  function promptForFolderName() {
    var folderName = prompt("Enter folder name:");
    return folderName ? folderName.trim() : null;
  }

  // Function to add a folder
  function addFolder(parentNode, folderName) {
    var folder = document.createElement("ul");
    folder.classList.add("folder");

    var folderItem = document.createElement("li");
    var folderSpan = document.createElement("span");
    folderSpan.classList.add("folder-name");
    folderSpan.textContent = folderName;
    folderItem.appendChild(folderSpan);
    folder.appendChild(folderItem);
    parentNode.appendChild(folder);
    folderSpan.addEventListener("click", function () {
      toggleFolder(this);
    });
  }

  // Function to add a file
  function addFile(parentNode, fileName) {
    var fileItem = document.createElement("li");
    var fileSpan = document.createElement("span");
    fileSpan.classList.add("file");
    fileSpan.textContent = fileName;

    fileItem.appendChild(fileSpan);
    parentNode.appendChild(fileItem);
  }

  // Function to toggle the display of sub-folders
  function toggleFolder(folderSpan) {
    var subFolder = folderSpan.nextElementSibling;
    if (subFolder) {
      subFolder.style.display =
        subFolder.style.display === "block" ? "none" : "block";
    }
  }

  // Function to find a folder by its name
  function findFolderByName(parentNode, name) {
    var folders = parentNode.querySelectorAll(".folder-name");

    for (var i = 0; i < folders.length; i++) {
      if (folders[i].textContent === name) {
        return folders[i].parentNode; 
      }
    }

    return null; 
  }

  function deleteItemByName(parentNode, itemName) {
    var items = parentNode.childNodes;

    for (var i = 0; i < items.length; i++) {
      if (items[i].nodeName.toLowerCase() === "ul") {
        var folderName = items[i].querySelector(".folder-name");
        if (folderName && folderName.textContent === itemName) {
          parentNode.removeChild(items[i]);
          return;
        }
      } else if (items[i].nodeName.toLowerCase() === "li") {
        var itemContent = items[i].querySelector(".file, .folder-name");
        if (itemContent && itemContent.textContent === itemName) {
          parentNode.removeChild(items[i]);
          return;
        }
      }
    }
  }

  addFolderButton.addEventListener("click", function () {
    var folderName = promptForFolderName();
    if (folderName) {
      addFolder(folderTree, folderName);
    }
  });

  addFileButton.addEventListener("click", function () {
    var fileName = prompt("Enter file name:");
    if (fileName) {
      var selectedFolder = prompt(
        "Enter the name of the folder to add to (or leave blank for root):"
      );
      var parentNode = selectedFolder
        ? findFolderByName(folderTree, selectedFolder)
        : folderTree;
      if (parentNode) {
        addFile(parentNode, fileName);
      } else {
        alert("Folder not found. Please make sure the folder exists.");
      }
    }
  });

  deleteButton.addEventListener("click", function () {
    var itemName = prompt("Enter the name of the folder or file to delete:");
    if (itemName) {
      deleteItemByName(folderTree, itemName);
    }
  });
});
