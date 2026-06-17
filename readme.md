- Instalando o framework React Native Expo na pasta stock-box:

    ```bash
    npx create-expo-app@latest stock-box --template blank-typescript
    ```
    
    Ou se preferir instalar na pasta local:

    ```bash
    npx create-expo-app@latest . --template blank-typescript
    ```

- Caso tenha criado a pasta acesse o local da instalação na pasta stock-box

    ```bash
    cd stock-box
    ```

- Instalando as libs adicionais:

    Para o SQLite oficial do Expo

    ```bash
    npx expo install expo-sqlite
    ```

    Para ícones (vai ser útil para o botão de voltar, editar, etc.)
    
    ```bash
    npx expo install @expo/vector-icons
    ```