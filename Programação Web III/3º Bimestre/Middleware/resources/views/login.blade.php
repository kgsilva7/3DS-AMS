<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 420px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header .icon {
            font-size: 50px;
            margin-bottom: 10px;
        }

        .header h1 {
            color: #2d3748;
            font-size: 24px;
        }

        .header p {
            color: #718096;
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            color: #4a5568;
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 14px;
        }

        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }

        .btn {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-login {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .error-message {
            background: #fff5f5;
            color: #e53e3e;
            padding: 10px 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 14px;
            border: 1px solid #feb2b2;
        }

        .info-users {
            margin-top: 20px;
            background: #f7fafc;
            border-radius: 10px;
            padding: 15px;
            border: 1px solid #e2e8f0;
        }

        .info-users h4 {
            color: #4a5568;
            margin-bottom: 10px;
        }

        .info-users .user-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13px;
        }

        .info-users .user-item:last-child {
            border-bottom: none;
        }

        .info-users .badge {
            padding: 2px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }

        .badge.admin {
            background: #48bb78;
            color: white;
        }

        .badge.user {
            background: #ed8936;
            color: white;
        }

        .footer-text {
            text-align: center;
            margin-top: 20px;
            color: #a0aec0;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="icon">🔐</div>
            <h1>Login</h1>
            <p>Entre com suas credenciais para acessar o sistema</p>
        </div>

        @if ($errors->any())
            <div class="error-message">
                @foreach ($errors->all() as $error)
                    {{ $error }}
                @endforeach
            </div>
        @endif

        <form action="{{ route('login') }}" method="POST">
            @csrf
            
            <div class="form-group">
                <label for="email">📧 Email</label>
                <input type="email" name="email" id="email" placeholder="seu@email.com" required>
            </div>

            <div class="form-group">
                <label for="password">🔑 Senha</label>
                <input type="password" name="password" id="password" placeholder="••••••••" required>
            </div>

            <button type="submit" class="btn btn-login">Entrar</button>
        </form>

        <div class="info-users">
            <h4>📝 Contas de teste</h4>
            <div class="user-item">
                <span>admin@teste.com</span>
                <span class="badge admin">Admin</span>
                <span>senha: 12345678</span>
            </div>
            <div class="user-item">
                <span>usuario@teste.com</span>
                <span class="badge user">Usuário</span>
                <span>senha: 12345678</span>
            </div>
        </div>

        <p class="footer-text">Laravel Middleware - Sistema de Controle de Acesso</p>
    </div>
</body>
</html>