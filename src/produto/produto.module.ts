import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./service/produto.service";
import { CategoriaService } from "../categoria/service/categoria.service";
import { CategoriaModule } from "../categoria/categoria.module";
@Module({
    imports:[TypeOrmModule.forFeature([Produto]),
    forwardRef(() => CategoriaModule)
    ],
    providers: [ProdutoService, CategoriaService],
    controllers:[ProdutoController],
    exports:[TypeOrmModule]
})

export class ProdutoModule {}

