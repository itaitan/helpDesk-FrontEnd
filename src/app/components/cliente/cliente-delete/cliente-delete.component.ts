import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.scss'],
})
export class ClienteDeleteComponent implements OnInit {
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

  constructor(
    private service: ClienteService,
    private tost: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(
      (resposta) => {
        this.tost.success('Cliente detado com sucesso', 'Cadastro');
        this.router.navigate(['clientes']);
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
