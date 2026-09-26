/**
 * Configuração de Autenticação e Acesso do Painel Administrativo dos Noivos
 */
(function (global) {
  const ADMIN_CONFIG = {
    // Senha padrão de acesso dos noivos (altere conforme sua preferência)
    adminPassword: "noivos.mariaedavi",
    sessionKey: "wedding_admin_session_auth",
    sessionDurationHours: 24,

    /**
     * Valida se a senha informada confere com a configurada
     * @param {string} password 
     * @returns {boolean}
     */
    verifyPassword(password) {
      if (!password) return false;
      return password.trim() === this.adminPassword;
    },

    /**
     * Cria sessão no navegador
     */
    login() {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(this.sessionKey, JSON.stringify({
          authenticated: true,
          timestamp: Date.now()
        }));
      }
    },

    /**
     * Encerra a sessão
     */
    logout() {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(this.sessionKey);
      }
    },

    /**
     * Verifica se o usuário atual está autenticado
     * @returns {boolean}
     */
    isAuthenticated() {
      if (typeof sessionStorage === 'undefined') return false;
      try {
        const session = JSON.parse(sessionStorage.getItem(this.sessionKey));
        if (!session || !session.authenticated) return false;
        
        // Verificar expiração
        const elapsedHours = (Date.now() - session.timestamp) / (1000 * 60 * 60);
        return elapsedHours < this.sessionDurationHours;
      } catch (e) {
        return false;
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ADMIN_CONFIG;
  } else {
    global.ADMIN_CONFIG = ADMIN_CONFIG;
  }
})(typeof window !== 'undefined' ? window : globalThis);
