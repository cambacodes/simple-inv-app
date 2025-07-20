# Aplicación de Inventario Simple

Una aplicación sencilla de gestión de inventario

## Demo

Puedes probar la aplicación en línea en: [https://simple-inv-app.vercel.app/](https://simple-inv-app.vercel.app/)

## Inicio Rápido

### 1. Instalar Dependencias

```bash
pnpm install
```

### 2. Configurar Entorno

Crea un archivo `.env` en el directorio raíz con:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_base_datos"
```

### 3. Configurar Base de Datos

```bash
# Enviar el esquema a la base de datos
pnpm db:push

# (Opcional) Poblar la base de datos con datos de ejemplo
pnpm db-seed
```

### 4. Ejecutar el Servidor de Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.
