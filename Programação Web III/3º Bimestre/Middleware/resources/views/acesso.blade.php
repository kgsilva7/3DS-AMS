<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Acesso Permitido</title>
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
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
        }

        .icon-success {
            font-size: 80px;
            margin-bottom: 20px;
        }

        h1 {
            color: #2d3748;
            font-size: 28px;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #718096;
            font-size: 16px;
            margin-bottom: 30px;
        }

        .user-card {
            background: #f7fafc;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
        }

        .user-card .label {
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 5px;
        }

        .user-card .value {
            color: #2d3748;
            font-size: 16px;
        }

        .user-card .divider {
            height: 1px;
            background: #e2e8f0;
            margin: 12px 0;
        }

        .badge {
            display: inline-block;
            background: #48bb78;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }

        .badge.admin {
            background: #48bb78;
        }

        .badge.user {
            background: #ed8936;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .btn-logout {
            background: #fc8181;
            color: white;
        }

        .btn-logout:hover {
            background: #f56565;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(245, 101, 101, 0.3);
        }

        .info-box {
            background: #ebf8ff;
            border-left: 4px solid #4299e1;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
        }

        .info-box p {
            color: #2b6cb0;
            font-size: 14px;
        }

        .info-box strong {
            color: #2c5282;
        }

        .footer-text {
            margin-top: 20px;
            color: #a0aec0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon-success">✅</div>
        
        <h1>Acesso Permitido</h1>
        <p class="subtitle">Você tem permissão para acessar este site.</p>

        <div class="user-card">
            <div class="label">👤 Usuário</div>
            <div class="value">{{ $user->name }}</div>
            
            <div class="divider"></div>
            
            <div class="label">📧 Email</div>
            <div class="value">{{ $user->email }}</div>
            
            <div class="divider"></div>
            
            <div class="label">🔑 Permissão</div>
            <div class="value">
                <span class="badge admin">Administrador</span>
            </div>
        </div>

        <div class="info-box">
            <p>
                <strong>✅ Middleware ativo:</strong> <br>
                O middleware <code>VerificarAcessoMiddleware</code> verificou sua permissão 
                e permitiu o acesso à página.
            </p>
        </div>

        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="btn btn-logout">🚪 Sair</button>
        </form>

        <p class="footer-text">Laravel Middleware - Sistema de Controle de Acesso</p>
    </div>
</body>
</html>