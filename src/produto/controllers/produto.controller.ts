import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../service/produto.service";

@Controller("produtos")
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll()
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number):Promise<Produto>{
        return this.produtoService.findById(id)
    }

    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome')nome: string): Promise<Produto[]>{
        return this.produtoService.findByNome(nome)
    }

    @Get("/maiorpreco/:preco")
    @HttpCode(HttpStatus.OK)
    maiorPreco(@Param('preco', ParseFloatPipe)preco: number):Promise<Produto[]>{
        return this.produtoService.maiorPreco(preco)
    }

    @Get("/menorpreco/:preco")
    @HttpCode(HttpStatus.OK)
    menorPreco(@Param('preco', ParseFloatPipe)preco: number):Promise<Produto[]>{
        return this.produtoService.menorPreco(preco)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }
}