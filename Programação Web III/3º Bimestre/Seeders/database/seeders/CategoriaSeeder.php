namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categorias')->insert([
            ['nome' => 'Eletrônicos', 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Roupas', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}