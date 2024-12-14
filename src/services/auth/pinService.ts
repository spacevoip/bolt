import { supabase } from '../../lib/supabase';
import { cryptoService } from '../cryptoService';

export const pinService = {
  async changePin(userId: string, currentPin: string, newPin: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Primeiro, verifica se o PIN atual está correto
      const { data: user } = await supabase
        .from('users')
        .select('pin')
        .eq('id', userId)
        .single();

      if (!user) {
        return { success: false, error: 'Usuário não encontrado' };
      }

      const isPinValid = await cryptoService.verifyPassword(currentPin, user.pin);
      if (!isPinValid) {
        return { success: false, error: 'PIN atual incorreto' };
      }

      // Hash do novo PIN
      const hashedPin = await cryptoService.hashPassword(newPin);

      // Atualiza o PIN no banco de dados
      const { error: updateError } = await supabase
        .from('users')
        .update({ pin: hashedPin })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      return { success: true };
    } catch (error) {
      console.error('Erro ao alterar PIN:', error);
      return { 
        success: false, 
        error: 'Ocorreu um erro ao alterar o PIN. Tente novamente mais tarde.' 
      };
    }
  }
};
