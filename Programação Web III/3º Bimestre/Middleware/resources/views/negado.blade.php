<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acesso Negado</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
        }

        .icon-error {
            font-size: 80px;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        h1 {
            color: #e53e3e;
            font-size: 32px;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #718096;
            font-size: 16px;
            margin-bottom: 20px;
        }

        .message-box {
            background: #fff5f5;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border: 2px solid #feb2b2;
        }

        .message-box .icon {
            font-size: 30px;
            margin-bottom: 10px;
        }

        .message-box .message {
            font-size: 18px;
            color: #c53030;
            font-weight: 600;
            line-height: 1.6;
        }

        .message-box .sub-message {
            color: #e53e3e;
            font-size: 14px;
            margin-top: 10px;
        }

        .info-box {
            background: #fefcbf;
            border-left: 4px solid #d69e2e;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
        }

        .info-box p {
            color: #744210;
            font-size: 14px;
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

        .btn-home {
            background: #4299e1;
            color: white;
        }

        .btn-home:hover {
            background: #3182ce;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(66, 153, 225, 0.3);
        }

        .btn-login {
            background: #48bb78;
            color: white;
        }

        .btn-login:hover {
            background: #38a169;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(72, 187, 120, 0.3);
        }

        .btn-group {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 20px;
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
        <div class="icon-error">🚫</div>
        
        <h1>Acesso Negado</h1>
        <p class="subtitle">Você não tem permissão para acessar este recurso.</p>

        <div class="message-box">
            <div class="icon">🔒</div>
            <div class="message">{{ $mensagem }}</div>
            <div class="sub-message">⚠️ Se você acredita que isso é um erro, entre em contato com o administrador.</div>
        </div>

        <div class="info-box">
            <p>
                <strong>💡 O que fazer?</strong><br>
                • Verifique se você está logado com a conta correta.<br>
                • Entre em contato com o administrador para solicitar acesso.<br>
                • Tente fazer login novamente.
            </p>
        </div>

        <div class="btn-group">
            <a href="{{ url('/') }}" class="btn btn-home">🏠 Página Inicial</a>
            <a href="{{ route('login') }}" class="btn btn-login">🔑 Fazer Login</a>
        </div>

        <p class="footer-text">Laravel Middleware - Sistema de Controle de Acesso</p>
    </div>
</body>
</html>