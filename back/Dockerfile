# ─── Stage 1 : téléchargement des dépendances (mis en cache) ───────────────
FROM eclipse-temurin:21-jdk-alpine AS deps

WORKDIR /app

# Copier UNIQUEMENT pom.xml d'abord
# Docker réutilise ce layer en cache si pom.xml n'a pas changé
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Télécharger toutes les dépendances sans compiler
RUN ./mvnw dependency:go-offline -B


# ─── Stage 2 : build + tests ────────────────────────────────────────────────
FROM deps AS build

# Copier le code source APRÈS les deps (cache plus efficace)
COPY src/ src/

# mvn package = compile + test unitaires + test intégration (via Flapdoodle)
# Retirer -DskipTests : les tests sont une gate de qualité
RUN ./mvnw package -B

# Si option B : skipper seulement les IT
# RUN ./mvnw package -B -DskipITs


# ─── Stage 3 : image de production (légère, sans JDK) ───────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copier uniquement le JAR depuis le stage build
COPY --from=build /app/target/*.jar app.jar

# PORT sera injecté par Render via variable d'env
EXPOSE 8080

# Options JVM adaptées aux conteneurs (mémoire limitée sur plan free)
ENTRYPOINT ["java",
  "-XX:+UseContainerSupport",
  "-XX:MaxRAMPercentage=75.0",
  "-jar", "app.jar"]