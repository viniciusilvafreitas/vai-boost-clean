import { StorageCategory } from '../types';

export class CleanStorageUseCase {
  /**
   * Calcula o total de bytes que podem ser liberados de forma segura.
   */
  static calculatePotentialMemoryGain(categories: StorageCategory[]): number {
    return categories
      .filter(c => c.isSafeToClean)
      .reduce((acc, curr) => acc + curr.sizeBytes, 0);
  }

  /**
   * Separa mídias enviadas (lixo potencial) de mídias recebidas (memórias).
   */
  static separateWhatsAppMedia(allPaths: string[]): { sent: string[], received: string[] } {
    return {
      sent: allPaths.filter(p => p.includes('WhatsApp/Media') && p.includes('/Sent')),
      received: allPaths.filter(p => p.includes('WhatsApp/Media') && !p.includes('/Sent'))
    };
  }
}
