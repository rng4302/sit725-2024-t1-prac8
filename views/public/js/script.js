const getcards = () => {
    $.get('/api/cards', (response) => {
        if (response.statusCode == 200) {
            addCards(response.data);
        }
    })
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text card-desc-color">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log("Form Data Submitted: ", formData);
    //postCat(formData);
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    $('.modal').modal();
    //getcards();
});

document.addEventListener('DOMContentLoaded', function() {
    fetchCards();

    var modalElem = document.querySelector('.modal');
    var modalInstance = M.Modal.init(modalElem);

    document.getElementById('kittenForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addToDb();
    });
});

function fetchCards() {
    fetch("http://localhost:3000/api/cards")
        .then(response => response.json())
        .then(data => {
            var div = document.getElementById("card-section");
            data.data.forEach(item => {
                var card = document.createElement('div');
                card.innerHTML = `
                    <div class="col s4 center-align">
                        <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${item.image}">
                            </div>
                            <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">
                                    ${item.title}
                                    <i class="material-icons right">more_vert</i>
                                </span>
                                <p>
                                    <a href="#">${item.color}</a>
                                </p>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">
                                    ${item.title}
                                    <i class="material-icons right">close</i>
                                </span>
                                <p class="card-text">
                                    ${item.description}
                                </p>
                            </div>
                        </div>
                    </div>`;
                div.appendChild(card);
            });
        })
        .catch(error => console.error("Error:", error));
}

function addToDb() {
    var formData = new FormData(document.getElementById('kittenForm'));

    fetch('http://localhost:3000/api/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Kitten added successfully");
            location.reload(); // Reload the page
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }