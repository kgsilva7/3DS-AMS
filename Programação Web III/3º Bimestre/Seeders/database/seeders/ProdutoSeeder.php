namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdutoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('produtos')->insert([
            ['categoria_id' => 1, 'nome' => 'Smartphone', 'preco' => 1500.00, 'created_at' => now(), 'updated_at' => now()],
            ['categoria_id' => 1, 'nome' => 'Notebook', 'preco' => 3500.00, 'created_at' => now(), 'updated_at' => now()],
            ['categoria_id' => 2, 'nome' => 'Camiseta', 'preco' => 50.00, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}