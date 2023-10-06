const btnCerrarSesion = document.getElementById('cerrar-sesion');
const userIn = document.querySelector('.enter_name');
const userTelf = document.querySelector('.enter_number');
const listContactBtn = document.querySelector('.list_item');
const form = document.getElementById('form');
const listContactTag = document.querySelector('.btn_list');
const subtitleListContact = document.querySelector('.subtitle');
const listContacts = document.querySelector('.contacts');
const createContactReturn = document.querySelector('.create_contact-btn');
const btnCreateReturn = document.querySelector('.btn-create');
const edit = document.querySelector('.fa-pencil');
const number_contact = document.querySelector('.number-contact');
//const trash = document.querySelector('.fa-trash');
const contact = document.querySelector('.contact');
const saveContact = document.querySelector('.save-btn');
saveContact.disabled = true;
const btnEdit = document.querySelector('.btn-edit');
const redp = document.querySelector('.error1'); 
const redp2 = document.querySelector('.error2');
let nameValid = false;
let numberValid = false;

const nombreeditar = /^[A-Z][a-z]+$/;
const numeroeditar = /^((0412)|(0212)|(0416)|(0414)|(0424)|(0426))[0-9]{7}$/;
const medida = matchMedia('(min-width: 769px)');

const user = JSON.parse(localStorage.getItem('user'));

window.addEventListener('resize', e =>{
 
if(medida.matches){

        listContacts.style.display = 'flex';//etiqueta padre de lista de contactos
        listContactTag.style.display = 'none';//boton de lista de contactos
        form.style.display = 'flex';//formulario
        btnCreateReturn.style.display = 'none';
        createContactReturn.style.display = 'none';//boton de regreso a crear contacto
        //createContactReturn.style.display = 'none';//boton de regreso a la lista de contactos

}else{
       

        if (createContactReturn.style.display === 'flex'){
            listContacts.style.display = 'flex';
            listContactTag.style.display = 'none';
        }else{
            createContactReturn.style.display = 'none'
            listContactTag.style.display = 'flex';
            listContacts.style.display = 'none';
        }
       
    }
    
})



//eventos del formulario del input crear nombre y telf del formulario
userIn.addEventListener('input', e =>{

    nameValid = nombreeditar.test(userIn.value);
    validation(userIn, nameValid, redp);
    unlockbtn (nameValid, numberValid); 
})

userTelf.addEventListener('input', e =>{

    numberValid = numeroeditar.test(userTelf.value);
    validation(userTelf, numberValid, redp2);
    unlockbtn(nameValid, numberValid);  
})
//verificacion de los datos de los inputs en crear contacto
const validation = (check, verificationData, error) =>{
    if (check.value !== ''){

        if(!verificationData){
            error.style.display = 'block';
        }else{
            error.style.display = 'none';
        }

    }else{
        error.style.display = 'none';
    }
}
//verificacion del desbloqueo del boton
const unlockbtn = (verificationname, verificationnumber) =>{

    if(verificationname && verificationnumber){
        saveContact.disabled = false;
    }else{
        saveContact.disabled = true;
    }

}
//boton de enviar contacto
saveContact.addEventListener('click', async e =>{

    e.preventDefault();
    const data = {
        username: userIn.value,
        tefl: userTelf.value
    }
//llamado a la base de datos
    const responseJSON = await fetch('https://septimointent.onrender.com/contacts', 
    {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: user.username, namecontact:data.username, telf: data.tefl})
    })
    const response = await responseJSON.json();
    //crear contacto modo usuario

    const crearContacto = document.createElement('div');
    crearContacto.setAttribute ('class', 'contact');

    crearContacto.innerHTML = `<div class='name-contact'>
    <i class='fa-solid fa-trash' id="${response.id}"></i>

    <input type='text' value='${data.username}' readonly class='input_edit enter_name-edit'>
    
    <button class='btn-edit'>
        <i class='fa-solid fa-pencil'></i>
        
        <div class="iconcheck">

            <i class="fa-solid fa-check" id="${response.id}"></i>
        </div>

    </button>
    
    </div>

    <div class='number-contact'>
        <input type='tel' readonly value='${data.tefl}' class='input_edit number_edit'>
    </div>`;



listContacts.appendChild(crearContacto);//agrega el contacto
form.reset()//resetea el formulario
saveContact.disabled = true;//desabilita el boton guardar
})

//boton para acceder a la lista de contactos en version mobile
listContactBtn.addEventListener('click', e => {
    form.style.display = 'none';
    listContactTag.style.display = 'none';
    subtitleListContact.style.display = 'block';
    listContacts.style.display = 'flex';
    createContactReturn.style.display = 'flex';
    btnCreateReturn.style.display = 'flex';
})
//boton regresar a crear contacto en version mobile
btnCreateReturn.addEventListener('click', e =>{
    form.style.display = 'flex';
    listContactTag.style.display = 'flex';
    btnCreateReturn.style.display = 'none';
    subtitleListContact.style.display = 'none';
    listContacts.style.display = 'none';
    createContactReturn.style.display = 'none';
})
//boton para editar producto
function editproduct(edit){

    edit.parentElement.parentElement.children[1].removeAttribute('readonly');//etiqueta del inputname
    edit.parentElement.parentElement.parentElement.children[1].children[0].removeAttribute('readonly');//etiqueta del inputnumber
    edit.parentElement.parentElement.children[1].style.background = '#4b5563';
    edit.parentElement.parentElement.parentElement.children[1].children[0].style.background = '#4b5563';
    edit.style.display = 'none';
    edit.parentElement.children[1].style.display = 'flex';
}

//funcion para evaluar los inputs de editar en tiempo real
listContacts.addEventListener('input', e=> {
     
    if(e.target.type === 'text'){

        validationedit(e.target, nombreeditar);
        
   }else if(e.target.type === 'tel'){

        validationedit(e.target, numeroeditar);
}

})
const validationedit = (verification, verificationRegex) =>{
    
    if(verificationRegex.test(verification.value)){

        verification.style.color = '#d1d5db';
    }else{
        verification.style.color = 'rgb(150, 35, 35)';
    }

}

//boton para guardar el contacto del icono check editado

const saveproduct = async (edit) =>{
       
    const nameInput = edit.parentElement.parentElement.parentElement.children[1].value;//etiqueta del inputname
    const numberInput = edit.parentElement.parentElement.parentElement.parentElement.children[1].children[0].value;//etiqueta del inputnumber

        if(nombreeditar.test(nameInput) && numeroeditar.test(numberInput)){

            await fetch(`https://septimointent.onrender.com/contacts/${edit.id}`, 
            {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({namecontact:nameInput, telf: numberInput})
            })

           edit.parentElement.style.display = 'none';//desabilita el check
           edit.parentElement.parentElement.children[0].style.display = 'flex';//habilita el pencil
           edit.parentElement.parentElement.parentElement.children[1].setAttribute('readonly', true); //solo lectura input name
           edit.parentElement.parentElement.parentElement.parentElement.children[1].children[0].setAttribute('readonly', true); //solo lectura el input number
           edit.parentElement.parentElement.parentElement.children[1].style.background = '#1f2937';//devuelve los colores del input nombre en modo guardado
           edit.parentElement.parentElement.parentElement.parentElement.children[1].children[0].style.background = '#1f2937';//devuelve los colores del input del numero en modo guardado

    }
}

//eventos de borrar contacto y editar contacto
listContacts.addEventListener('click', e =>{
    if(e.target.className === 'fa-solid fa-trash'){
        deleteContact(e.target); 
    }else if(e.target.className === 'fa-solid fa-pencil'){
        editproduct(e.target);
    }else if(e.target.className === 'fa-solid fa-check'){
        saveproduct(e.target);
    }
})

const deleteContact = async (borrar) =>{//borrar el contacto

    await fetch(`https://septimointent.onrender.com/contacts/${borrar.id}`, 
    {method: 'DELETE'})
    borrar.parentElement.parentElement.remove();
}

//imprime los contactos al iniciar la pagina
const getcontactsdatabase = async () =>{

    const response = await fetch ('https://septimointent.onrender.com/contacts', {method: 'GET'});
    const contacts = await response.json();
    
    const getcontacts = contacts.filter(contact => contact.user === user.username);
    getcontacts.forEach(todo =>{
        
        listContacts.innerHTML += ` <div class="contact" id="contact1">
                  <div class='name-contact'>
        <i class='fa-solid fa-trash' id=${todo.id}></i>
    
        <input type='text' value='${todo.namecontact}' readonly class='input_edit enter_name-edit'>
        
        <button class='btn-edit'>
            <i class='fa-solid fa-pencil'></i>
            
            <div class="iconcheck">
    
                <i class="fa-solid fa-check" id="${todo.id}"></i>
            </div>
    
        </button>
        
        </div>
    
        <div class='number-contact'>
            <input type='tel' readonly value='${todo.telf}' class='input_edit number_edit'>
        </div>
        </div>`;
    })
}
getcontactsdatabase();