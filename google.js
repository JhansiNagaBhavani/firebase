// Import Firebase
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

        // Firebase config
        const firebaseConfig = {
        apiKey: "AIzaSyA_DY_px6r1_vgZQIUa5YkuRTsrQJFirNA",
        authDomain: "gen-lang-client-0930919869.firebaseapp.com",
        projectId: "gen-lang-client-0930919869",
        storageBucket: "gen-lang-client-0930919869.appspot.com", // Replace with actual value from Firebase console
        messagingSenderId: "123456789012", // Replace with actual value from Firebase console
        appId: "1:123456789012:web:abcdef123456" // Replace with actual value from Firebase console
};
        

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        // Email/Password Login
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                alert('Login successful! Welcome ' + user.email);
                console.log('User:', user);
                window.location.href = 'home.html';
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed: ' + error.message);
            }
        });

        const registerBtn = document.getElementById('registerBtn');
        if (registerBtn) {
            registerBtn.addEventListener('click', async () => {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                if (!email || !password) {
                    alert('Please enter both email and password to register.');
                    return;
                }

                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    alert('Registration successful! Welcome ' + user.email);
                    console.log('Registered user:', user);
                    window.location.href = 'home.html';
                } catch (error) {
                    console.error('Registration error:', error);
                    alert('Registration failed: ' + error.message);
                }
            });
        }

        // Google Sign-In
        window.signInWithGoogle = async function() {
            const provider = new GoogleAuthProvider();

            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                alert('Google sign-in successful! Welcome ' + user.displayName);
                console.log('User:', user);
                window.location.href = 'home.html';
            } catch (error) {
                console.error('Google sign-in error:', error);
                alert('Google sign-in failed: ' + error.message);
            }
        };

        window.logout = async function() {
            try {
                await signOut(auth);
                alert('You have been logged out.');
                window.location.href = 'google.html';
            } catch (error) {
                console.error('Logout error:', error);
                alert('Logout failed: ' + error.message);
            }
        };