import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnicos';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.scss'],
})
export class TecnicoDeleteComponent implements OnInit {
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

  constructor(
    private service: TecnicoService,
    private tost: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(
      (resposta) => {
        this.tost.success('Tecnico detado com sucesso', 'Cadastro');
        this.router.navigate(['tecnicos']);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.tost.error(element.message);
          });
        } else {
          this.tost.error(ex.error.message);
        }
      }
    );
  }
}
