$(document).ready(function () {
    listAnimals();

    $('#animal_form').submit(function (e) {
        e.preventDefault();
        const animalName = $('#animal_name').val();

        $.post('http://cafepradev.com.br:21020/animals/insert', { animal: animalName }, function () {
            $('#animal_name').val('');
            listAnimals();
        });
    });

    function listAnimals() {
        $.get('http://cafepradev.com.br:21020/animals/list', function (data) {
            const animalList = $('#animal_list');
            animalList.empty();

            data.forEach(function (animal) {
                animalList.append(`
                    <tr>
                        <td>${animal.id}</td>
                        <td>${animal.animal}</td>
                        <td>
                            <button class="edit-btn" data-id="${animal.id}">Editar</button>
                            <button class="delete-btn" data-id="${animal.id}">Deletar</button>
                        </td>
                    </tr>
                `);
            });

            $('.edit-btn').click(function () {
                const animalId = $(this).data('id');
                editAnimal(animalId);
            });

            $('.delete-btn').click(function () {
                const animalId = $(this).data('id');
                deleteAnimal(animalId);
            });
        });
    }

    function editAnimal(id) {
        const newAnimalName = prompt('Editar Nome do Animal:');
        if (newAnimalName !== null) {
            $.ajax({
                url: `http://cafepradev.com.br:21020/animals/update/${id}`,
                type: 'PUT',
                data: { animal: newAnimalName },
                success: listAnimals,
            });
        }
    }

    function deleteAnimal(id) {
        if (confirm('Tem certeza que deseja deletar este animal?')) {
            $.ajax({
                url: `http://cafepradev.com.br:21020/animals/delete/${id}`,
                type: 'DELETE',
                success: listAnimals,
            });
        }
    }
});
