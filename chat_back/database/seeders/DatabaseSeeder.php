<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\User::factory(10)->create();
//        User::create([
//            'name'=>'Admin',
//            'email' => 'admin@gmail.com',
//            'password' => '$2a$10$7oMxkBuQ0PpbVxpJl0ufNerj0TTuZmRxrD76LlyKCaMCh8bpZqVS2',   //admin
//        ]);
    }
}
