<?php

namespace Database\Seeders;

use App\Models\Curso;
use App\Models\Evento;
use App\Models\Nota;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Cursos
        Curso::create([
            'nome' => 'Desenvolvimento de Sistemas',
            'descricao' => 'Curso técnico com foco em programação web, mobile e banco de dados.',
            'periodo' => 'Manhã',
            'duracao' => '3 Semestres'
        ]);

        Curso::create([
            'nome' => 'Administração',
            'descricao' => 'Formação em gestão empresarial, finanças e recursos humanos.',
            'periodo' => 'Tarde',
            'duracao' => '3 Semestres'
        ]);

        Curso::create([
            'nome' => 'Eletrônica',
            'descricao' => 'Curso técnico com ênfase em circuitos, sistemas e automação.',
            'periodo' => 'Noite',
            'duracao' => '3 Semestres'
        ]);

        // Eventos
        Evento::create([
            'titulo' => 'Semana Paulo Freire',
            'descricao' => 'Palestras e oficinas sobre metodologias ativas.',
            'data_evento' => '2026-09-15 09:00:00',
            'local' => 'Auditório'
        ]);

        Evento::create([
            'titulo' => 'Hackathon de Inovação',
            'descricao' => 'Maratona de programação com desafios para os alunos.',
            'data_evento' => '2026-10-20 08:00:00',
            'local' => 'Laboratório de Informática'
        ]);

        // Usuário de teste
        $user = User::create([
            'name' => 'Aluno Teste',
            'email' => 'aluno@etec.com',
            'password' => Hash::make('12345678')
        ]);

        // Notas para o usuário
        Nota::create([
            'user_id' => $user->id,
            'materia' => 'Programação Web',
            'mencao' => 'MB'
        ]);

        Nota::create([
            'user_id' => $user->id,
            'materia' => 'Banco de Dados',
            'mencao' => 'B'
        ]);

        Nota::create([
            'user_id' => $user->id,
            'materia' => 'Matemática',
            'mencao' => 'R'
        ]);
    }
}