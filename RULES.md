# 🏛️ Reglas de Arquitectura del Proyecto (Hexagonal + DDD)

Estas reglas establecen la organización, las responsabilidades y los límites de dependencia del proyecto, siguiendo los principios de Arquitectura Hexagonal, Domain-Driven Design (DDD) y separación de responsabilidades.

## 📐 1. Regla de dependencia

La dirección de las dependencias debe apuntar hacia las capas internas:

`Infrastructure → Application → Domain`

- **Dominio:** no debe importar archivos de `application` ni de `infrastructure`.
- **Aplicación:** puede depender del dominio, pero nunca de implementaciones concretas de infraestructura.
- **Infraestructura:** puede depender de aplicación y dominio para implementar sus contratos.
- **Inversión de dependencias:** cuando una capa interna necesita un servicio externo, debe depender de una abstracción y no de su implementación concreta.
- **Frameworks y librerías:** Express, drivers de bases de datos, bcrypt y otras herramientas técnicas deben mantenerse fuera del dominio. Cuando un caso de uso necesite estas capacidades, debe utilizar las abstracciones correspondientes.

La dirección de las dependencias se refiere a las importaciones y referencias entre módulos, no al orden en que se ejecutan las operaciones.

## 🧠 2. Capa de Dominio (`src/domain/`)

Es el núcleo del negocio. Contiene el modelo de dominio y las reglas que definen su comportamiento.

- **`entities/`:** entidades de dominio con identidad y comportamiento propio. Sus atributos y operaciones deben representar conceptos del negocio.
- **`value-objects/`:** objetos de valor que representan conceptos definidos por sus atributos, como `Email` o `Money`, cuando su complejidad lo justifique.
- **`repositories/`:** contratos de repositorios cuando representan la persistencia de entidades o agregados del dominio. Por ejemplo, `UserRepository` puede recibir una entidad `User`.
- **`services/`:** servicios de dominio para reglas de negocio que no pertenecen naturalmente a una entidad o un objeto de valor.
- **`errors/`:** errores específicos del dominio, como infracciones de reglas de negocio.

### Reglas del dominio

- No debe conocer la estructura de las tablas ni los modelos específicos de una base de datos.
- No debe contener DTOs exclusivos de HTTP ni modelos de persistencia.
- No debe depender de librerías externas para generar UUID, hashear contraseñas o acceder a servicios técnicos.
- Las entidades deben mantener sus invariantes y no limitarse necesariamente a almacenar datos.

**Importante:** los contratos de repositorio pueden estar en dominio cuando forman parte del modelo de persistencia del dominio. No todos los puertos deben definirse allí.

## ⚙️ 3. Capa de Aplicación (`src/application/`)

Orquesta los casos de uso y coordina las operaciones necesarias para completar una acción del sistema.

- **`use-cases/`:** cada clase o módulo representa una acción concreta, como `RegisterUser`, `LoginUser` o `CreateExpense`.
- **`dtos/`:** contiene los tipos de entrada y salida propios de los casos de uso cuando sean necesarios. No deben confundirse automáticamente con los esquemas HTTP ni con los modelos de persistencia.
- **`ports/`:** contiene las interfaces de los servicios externos que necesitan los casos de uso cuando esos contratos no pertenecen al dominio.

### Reglas de aplicación

- Los casos de uso pueden recibir DTOs, ejecutar validaciones de aplicación y coordinar entidades y repositorios.
- No deben depender de implementaciones concretas de infraestructura.
- Pueden utilizar puertos para servicios como `IdGenerator`, `PasswordHasher`, `EmailSender` o `TokenGenerator`.
- Deben coordinar el flujo de negocio sin asumir las responsabilidades técnicas de la base de datos, el framework HTTP o las librerías externas.

### DTOs y datos de entrada

- Los datos recibidos por HTTP se validan en la entrada del sistema.
- El caso de uso recibe los datos necesarios para ejecutar la operación.
- Los identificadores obtenidos del contexto de autenticación, como `userId`, deben proceder del contexto confiable de autenticación y no aceptarse ciegamente desde el cuerpo de la petición.
- La entidad de dominio se construye con los datos necesarios para mantener sus invariantes.

No debe crearse un DTO adicional únicamente para añadir un identificador si no existe una necesidad real de transformación o separación de responsabilidades.

## 🔌 4. Puertos y adaptadores

Los puertos representan contratos; los adaptadores implementan esos contratos o conectan el sistema con tecnologías externas.

### ¿Dónde se definen los puertos?

**En dominio:** cuando representan una abstracción propia del modelo de negocio, como un repositorio de agregados.

**En aplicación:** cuando representan una dependencia externa necesaria para ejecutar un caso de uso, como un generador de identificadores, un servicio de correo o un hasher de contraseñas.

No es obligatorio que todos los puertos se encuentren en la misma capa. Su ubicación debe responder a la responsabilidad que representan y a la dirección de dependencias deseada.

### Ejemplo: hashear contraseñas

- `PasswordHasher`: interfaz en aplicación.
- `BcryptHasher`: implementación en infraestructura.
- `RegisterUser`: caso de uso que solicita el hash antes de persistir al usuario.

Para el inicio de sesión, el mismo puerto puede proporcionar un método `compare()` que compruebe una contraseña ingresada contra el hash almacenado.

### Ejemplo: persistencia

- `UserRepository`: contrato de repositorio, normalmente en dominio si representa la persistencia del agregado `User`.
- `UserRepositoryImpl`: implementación en infraestructura.
- `UserDataSource`: contrato técnico de persistencia, ubicado fuera del dominio cuando describe detalles propios de la infraestructura.
- `UserDataSourceImpl`: implementación que utiliza la base de datos concreta.

Si se utiliza un contrato de Data Source, su ubicación debe permitir que la implementación lo conozca sin introducir dependencias desde dominio hacia infraestructura.

## 🗄️ 5. Capa de Infraestructura (`src/infrastructure/`)

Contiene los detalles técnicos que conectan el sistema con el exterior.

- **`http/`:** controladores, rutas, middlewares, configuración de Express y esquemas de validación HTTP, como los esquemas Zod.
- **`adapters/`:** implementaciones concretas de puertos de aplicación, como `BcryptHasher`, `UuidGenerator` o `JwtTokenGenerator`.
- **`repositories/`:** implementaciones concretas de los contratos de repositorio, como `UserRepositoryImpl`.
- **`datasources/`:** acceso concreto a bases de datos, archivos o APIs externas.
- **`models/`:** modelos de persistencia cuando la estructura de los datos almacenados difiere de la entidad de dominio.
- **`mappers/`:** transformaciones entre entidades de dominio y modelos de persistencia cuando sean necesarias.

### Reglas de infraestructura

- Las implementaciones concretas deben respetar los contratos que implementan.
- La implementación del repositorio puede transformar una entidad de dominio en un modelo de persistencia antes de invocar al Data Source.
- El Data Source debe recibir el tipo definido
