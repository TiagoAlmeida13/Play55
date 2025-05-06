export interface IMensagem {
    nomeRemetente: string;
    data: string;
    texto: string;
    curtidas: number;
    mensagemPropria: boolean;
    acoes?: {
        editar?: boolean;
        excluir?: boolean;
    };
}
