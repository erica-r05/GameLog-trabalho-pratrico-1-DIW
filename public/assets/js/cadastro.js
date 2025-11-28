document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const birthDateInput = document.getElementById('birthDate');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    birthDateInput.addEventListener('input', function(e) {
        let value = e.target.value;
        value = value.replace(/\D/g, ''); 
        if (value.length > 8) {
            value = value.substring(0, 8);
        }
        if (value.length > 4) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4);
        } else if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        
        e.target.value = value;
    });
    function validateForm(birthDateBr) {
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (password.length < 6) {
            passwordError.style.display = 'block';
            isValid = false;
        }
        if (password !== confirmPassword) {
            confirmPasswordError.style.display = 'block';
            isValid = false;
        }
        if (!dateRegex.test(birthDateBr)) {
            alert("Por favor, insira a data de nascimento completa no formato DD/MM/AAAA.");
            birthDateInput.focus();
            isValid = false;
        }
        return isValid;
    }
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const birthDateBr = birthDateInput.value;
        if (!validateForm(birthDateBr)) {
            return;
        }
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = emailInput.value;
        const password = document.getElementById('password').value;
        const gender = document.getElementById('gender').value;
        const parts = birthDateBr.split('/');
        const birthDateIso = `${parts[2]}-${parts[1]}-${parts[0]}`; 
        try {
            const checkEmailResponse = await fetch(`http://localhost:3000/users?email=${email}`);
            const existingUsers = await checkEmailResponse.json();

            if (existingUsers.length > 0) {
                emailError.textContent = 'Este e-mail já está cadastrado.';
                emailError.style.display = 'block';
                return;
            }
        } catch (error) {
            console.error('Erro ao verificar e-mail:', error);
            alert('Aviso: Não foi possível verificar a duplicidade do e-mail. Prosseguindo com o cadastro.');
        }
        try {
            const response = await fetch('http://localhost:3000/users', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName, 
                    lastName: lastName, 
                    email: email,
                    password: password, 
                    birthDate: birthDateIso, 
                    gender: gender
                })
            });

            if (response.status === 201) { 
                alert('Cadastro realizado com sucesso! Faça login para continuar.');
                window.location.href = 'login.html';
            } else {
                const data = await response.json();
                alert(data.message || `Erro ao realizar cadastro (Status: ${response.status})`);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            alert('Erro ao conectar ao servidor. Verifique se o json-server está rodando.');
        }
    });

});