import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    
    ) {}

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations: {
                produto: true
            }
        });
    }

    async findById(id: number): Promise<Categoria>{
        let buscarCategoria = await this.categoriaRepository.findOne({
            where: {id},
            relations:{
                produto: true
            }
        })

        if(!buscarCategoria){
            throw new HttpException('A categoria não foi encontrada!', HttpStatus.NOT_FOUND)
        }

        return buscarCategoria;
    }

    async findByTipo(tipo: string): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where:{
                tipo: ILike(`%${tipo}%`)
            },
            relations:{
                produto: true
            }
        })
    }
    
    async create(categoria: Categoria): Promise<Categoria>{
        return await this.categoriaRepository.save(categoria)
    }
    
    async update(categoria: Categoria): Promise<Categoria>{
        let buscarCategoria = await this.findById(categoria.id)

        if(!buscarCategoria || !categoria.id)
            throw new HttpException('A categoria não foi encontrada!', HttpStatus.NOT_FOUND)
        
        return await this.categoriaRepository.save(categoria)
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscarCategoria = await this.findById(id) 

        if(!buscarCategoria)
            throw new HttpException("A categoria não foi encontrada!", HttpStatus.NOT_FOUND)

        return await this.categoriaRepository.delete(id);
    }

}