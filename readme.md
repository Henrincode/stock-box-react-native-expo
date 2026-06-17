# Passos Executados Até ao Momento

### 1. Inicialização do Projeto

O projeto foi criado a partir de um ambiente limpo utilizando o comando:

```bash
npx create-expo-app@latest stock-box-react-native-expo --template blank-typescript

```

### 2. Migração para a Estrutura `src/app`

Para evitar poluição na raiz do projeto e seguir boas práticas de mercado, foram executadas as seguintes alterações estruturais:

* Eliminação do ficheiro `App.tsx` que vinha por padrão na raiz.
* Criação das pastas `src/` e `src/app/`.
* Manutenção do ficheiro `index.ts` na raiz com o papel exclusivo de delegar o ponto de entrada para o ecossistema de rotas:

```typescript
import "expo-router/entry";

```



### 3. Instalação e Configuração do Ecossistema de Rotas (Expo Router)

Como o template escolhido era totalmente em branco (*blank*), as bibliotecas que compõem o motor de navegação nativo e otimização de ecrãs foram adicionadas manualmente:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar @expo/vector-icons

```

### 4. Integração do Plugin no Manifesto

O ficheiro `app.json` foi atualizado para reconhecer o `expo-router` como o gestor oficial de navegação do projeto, adicionando o seguinte bloco dentro da propriedade `"expo"`:

```json
"plugins": [
  "expo-router"
]

```

### 5. Criação do Primeiro Ecrã Base (`src/app/index.tsx`)

Criou-se o ecrã inicial utilizando styled components nativos (`StyleSheet`) para validar que todo o motor do Expo e do TypeScript está a resolver os caminhos corretamente. O ficheiro exibe um fundo escuro customizado (`#1A1A1A`) com um texto centralizado.

---

## Resumo das Dependências Instaladas e Suas Funções

| Dependência | Função / Papel no Projeto |
| --- | --- |
| `expo-router` | Transforma a estrutura de ficheiros de `src/app/` em rotas utilizáveis no app. |
| `expo-sqlite` | Driver oficial que gerirá a base de dados SQL local no dispositivo do utilizador. |
| `react-native-screens` | Otimiza a performance ao utilizar os componentes nativos de transição de ecrã do Android/iOS. |
| `react-native-safe-area-context` | Garante que o conteúdo não fique escondido sob a câmara (*notch*) ou barras de sistema. |
| `expo-linking` | Permite a interação do aplicativo com links externos (*deep links*). |
| `expo-constants` | Oferece acesso fácil a configurações estáticas do sistema e do `app.json`. |
| `expo-status-bar` | Controla o estilo visual da barra superior do telemóvel (ex: cor das letras da bateria/hora). |
| `@expo/vector-icons` | Biblioteca de ícones nativos que usaremos nos botões de edição, adição e navegação. |

