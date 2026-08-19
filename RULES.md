# 🏛️ Reglas de Arquitectura del Proyecto (Hexagonal + DDD)

Basado en los principios de Arquitectura Hexagonal y Domain-Driven Design (DDD), las siguientes reglas definen la estructura y límites de nuestro proyecto.

## 📐 1. Regla de Dependencia (La Regla de Oro)
* **Dirección de dependencias:** `Infrastructure` ➡️ `Application` ➡️ `Domain`.
* **Aislamiento del Dominio:** La capa `domain` **jamás** debe importar archivos de `application` o `infrastructure`.
* **Agnosticismo:** `domain` y `application` no deben estar acoplados a frameworks externos (Express, bases de datos, librerías de encriptación). Todo eso pertenece a `infrastructure`.
* **Módulos transversales:** Agrupa por funcionalidad dentro de cada capa (ej. la carpeta `auth` existe de forma independiente en `application`, `domain` e `infrastructure/http`).

---

## 🧠 2. Capa de Dominio (`src/domain/`)
Es el corazón del negocio. Solo contiene reglas de negocio, modelos e interfaces (contratos).
* **`entities/`:** Contiene los modelos puros de negocio (ej. `user.entity.ts`).
* **`ports/`:** Define interfaces para servicios externos o utilidades (ej. `passwordHasher.ts`). **No contiene implementaciones.**
* **`repositories/` & `datasources/`:** Define las interfaces (contratos) sobre cómo se guardan o recuperan los datos (ej. `auth.repository.ts`). 

---

## ⚙️ 3. Capa de Aplicación (`src/application/`)
Orquesta el flujo de la información. Define "qué" hace el sistema.
* **`useCases/`:** Contiene la lógica de aplicación. Cada archivo debe representar una única acción del sistema (Principio de Responsabilidad Única, ej. `login.useCase.ts`). Reciben interfaces del dominio, nunca implementaciones de infraestructura.
* **`dtos/`:** (Data Transfer Objects) Clases o tipos puros para validar y tipar la información que entra o sale de los casos de uso.

---

## 🔌 4. Capa de Infraestructura (`src/infrastructure/`)
Implementa los detalles técnicos y se comunica con el exterior (Web, BD, APIs).
* **`http/`:** Exclusivo para la entrada/salida a través de la red (API REST). Aquí van los Controladores, Rutas (`router.ts`), Middlewares y Esquemas de validación (ej. `login.schema.ts`).
* **`adapters/`:** Implementaciones concretas de los `ports` definidos en el dominio, usando librerías externas (ej. `bycriptPasswordHasher.ts`, `jwtTokenGenerator.ts`).
* **`repositories/` & `datasources/`:** Implementaciones reales de las interfaces del dominio usando herramientas específicas (SQL, MongoDB, APIs de terceros). 

---

## 📝 5. Nomenclatura de Archivos
* **Patrón de nombres:** `[nombre].[capa_o_tipo].ts` en formato *camelCase*.
  * *Ejemplos:* `login.useCase.ts`, `user.entity.ts`, `authController.ts`.
* **Sufijo de Implementación (`.impl.ts`):** Las clases en la capa de infraestructura que implementan un contrato del dominio deben usar el sufijo `.impl`.
  * *Ejemplos:* `auth.datasource.impl.ts`, `auth.repository.impl.ts`.