const form       = <HTMLFormElement>  document.getElementById('form');
const inpName    = <HTMLInputElement> document.getElementById('inp-name');
const inpEmail   = <HTMLInputElement> document.getElementById('inp-email');
const inpContact = <HTMLInputElement> document.getElementById('inp-contact');
const alertContainer = <HTMLDivElement>    document.getElementById('alert-container');
const alertMessage   = <HTMLSpanElement>   document.getElementById('alert-message');
const alertCloseBtn  = <HTMLButtonElement> document.getElementById('alert-close');

let alertTimeout:number|null = null;

interface formData {
    name:string, 
    contact:string, 
    email:string
}

const hideAlert = ():void => {
    if(alertTimeout !== null) {
        clearTimeout(alertTimeout);
        alertTimeout = null;
    }
    alertContainer.classList.add('hidden');
}

const showAlert = (message:string, duration:number = 5000):void => {
    hideAlert();
    alertMessage.textContent = message;
    alertContainer.classList.remove('hidden');
    alertTimeout = setTimeout(hideAlert, duration);
}

const getValue = (input:HTMLInputElement): string => {
    return input.value.trim();
}

const getValues = ():formData => {
    return {name: getValue(inpName), contact: getValue(inpContact), email: getValue(inpEmail)};
}

const validateForm = (data:formData):boolean => {
    if(data.name.length < 3) {
        showAlert("A gente precisa que você preencha seu nome para participar do grupo 😉")
        return false;
    }
    if(data.email.length < 3 || !data.email.includes('@') || !data.email.includes('.')) {
        showAlert("Ops, parece que seu email tá com alguma coisa errada, confere e manda pra gente dnv 😉")
        return false;
    }
    if(data.contact.replace('/\D/g', '').length < 10) {
        showAlert("Ops, parece que seu celular tá com alguma coisa errada, confere e manda pra gente dnv 😉")
        return false;
    }
    return true;
}

const openWhatsapp = () => {
    const groupInvite = 'https://chat.whatsapp.com/EH4Wap5Pzgr8NoKJaQjKCG';
    window.open(groupInvite, '_blank');
}

form.addEventListener("submit", (event) => {
    const data = getValues();
    if(validateForm(data)) {
        try {
            fetch("https://mapi-kw50.onrender.com/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth": "9f6a6095bc6158b2b189eb009fe6b44d"
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    contact: data.contact
                })
            });
        } catch (error:any) {
            console.error({Erro: error?.message});
        } finally {
            openWhatsapp();
        }
    }
    event.preventDefault();
})

alertCloseBtn.addEventListener('click', hideAlert);