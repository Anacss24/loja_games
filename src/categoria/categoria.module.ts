import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoModule } from "../produto/produto.module";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./service/categoria.service";
import { ProdutoService } from "../produto/service/produto.service";
import { CategoriaController } from "./controllers/categoria.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Categoria]),
     forwardRef(() => ProdutoModule),
    ],
    providers:[CategoriaService, ProdutoService],
    controllers:[CategoriaController],
    exports:[TypeOrmModule]
})

export class CategoriaModule {}
