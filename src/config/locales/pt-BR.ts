export const ptBR = {
  common: {
    welcome: 'Bem-vindo de volta',
    account: 'Conta',
    balance: 'Saldo Disponível',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    actions: {
      send: 'Enviar',
      receive: 'Receber',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      close: 'Fechar',
      save: 'Salvar',
      edit: 'Editar'
    }
  },
  auth: {
    login: {
      title: 'Entrar',
      email: 'E-mail',
      password: 'Senha',
      submit: 'Entrar',
      register: 'Criar conta',
      forgotPassword: 'Esqueceu a senha?'
    },
    register: {
      title: 'Criar Conta',
      name: 'Nome completo',
      email: 'E-mail',
      password: 'Senha',
      confirmPassword: 'Confirmar senha',
      submit: 'Criar conta',
      login: 'Já tem uma conta? Entre aqui'
    }
  },
  dashboard: {
    overview: 'Visão geral financeira',
    quickActions: {
      sendPix: 'Enviar PIX',
      sendDescription: 'Transferência instantânea',
      qrCode: 'PIX QR Code',
      qrDescription: 'Receba pagamentos facilmente',
      transactions: 'Transações',
      transDescription: 'Veja seu histórico',
      savings: 'Poupança',
      savingsDescription: 'Gerencie suas economias'
    },
    balance: {
      incoming: 'Total Recebido',
      outgoing: 'Total Enviado',
      available: 'Disponível para PIX',
      instant: 'Transferência Instantânea'
    },
    recentTransactions: {
      title: 'Transações Recentes',
      noTransactions: 'Nenhuma transação recente',
      viewAll: 'Ver todas'
    }
  },
  transactions: {
    title: 'Transações',
    filter: {
      all: 'Todas',
      sent: 'Enviadas',
      received: 'Recebidas'
    },
    status: {
      pending: 'Pendente',
      completed: 'Concluída',
      failed: 'Falhou',
      cancelled: 'Cancelada'
    },
    details: {
      title: 'Detalhes da Transação',
      amount: 'Valor',
      type: 'Tipo',
      date: 'Data',
      description: 'Descrição',
      status: 'Status',
      from: 'De',
      to: 'Para',
      id: 'ID da Transação'
    }
  },
  pix: {
    qrCode: {
      generate: 'Gerar QR Code',
      scan: 'Escanear QR Code',
      amount: 'Valor',
      description: 'Descrição (opcional)',
      validUntil: 'Válido até',
      status: {
        waiting: 'Aguardando pagamento',
        received: 'Pagamento recebido',
        expired: 'QR Code expirado',
        cancelled: 'QR Code cancelado'
      }
    },
    transfer: {
      title: 'Transferência PIX',
      key: 'Chave PIX',
      amount: 'Valor',
      description: 'Descrição',
      review: 'Revisar transferência',
      confirm: 'Confirmar transferência'
    }
  },
  profile: {
    title: 'Configurações do Perfil',
    subtitle: 'Gerencie suas informações e segurança',
    fields: {
      name: 'Nome',
      email: 'E-mail',
      cnpj: 'CNPJ',
      account: 'Conta',
      taxRate: 'Taxa',
      manager: 'Gerente',
      memberSince: 'Membro desde',
      avatar: 'Foto do Perfil',
      password: 'Senha'
    },
    security: {
      changePassword: 'Alterar Senha',
      currentPassword: 'Senha Atual',
      newPassword: 'Nova Senha',
      confirmPassword: 'Confirmar Senha',
      pinVerification: 'Verificação de PIN',
      enterPin: 'Digite seu PIN de 4 dígitos'
    }
  }
};