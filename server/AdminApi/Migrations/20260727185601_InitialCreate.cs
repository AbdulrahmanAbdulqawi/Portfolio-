using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AdminApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AboutContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HeadlineEn = table.Column<string>(type: "text", nullable: false),
                    HeadlineAr = table.Column<string>(type: "text", nullable: false),
                    ParagraphsEn = table.Column<string>(type: "jsonb", nullable: false),
                    ParagraphsAr = table.Column<string>(type: "jsonb", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutContents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdminUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlsoBuiltItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    NameEn = table.Column<string>(type: "text", nullable: false),
                    NameAr = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlsoBuiltItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Certifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    TextEn = table.Column<string>(type: "text", nullable: false),
                    TextAr = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Certifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EducationEntries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    SchoolEn = table.Column<string>(type: "text", nullable: false),
                    SchoolAr = table.Column<string>(type: "text", nullable: false),
                    DegreeEn = table.Column<string>(type: "text", nullable: false),
                    DegreeAr = table.Column<string>(type: "text", nullable: false),
                    LocationEn = table.Column<string>(type: "text", nullable: false),
                    LocationAr = table.Column<string>(type: "text", nullable: false),
                    PeriodEn = table.Column<string>(type: "text", nullable: false),
                    PeriodAr = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationEntries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Experiences",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    PeriodEn = table.Column<string>(type: "text", nullable: false),
                    PeriodAr = table.Column<string>(type: "text", nullable: false),
                    TitleEn = table.Column<string>(type: "text", nullable: false),
                    TitleAr = table.Column<string>(type: "text", nullable: false),
                    Company = table.Column<string>(type: "text", nullable: false),
                    ParagraphEn = table.Column<string>(type: "text", nullable: false),
                    ParagraphAr = table.Column<string>(type: "text", nullable: false),
                    Chips = table.Column<string>(type: "jsonb", nullable: false),
                    LogoUrl = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experiences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recommendations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ShortEn = table.Column<string>(type: "text", nullable: false),
                    ShortAr = table.Column<string>(type: "text", nullable: false),
                    FullEn = table.Column<string>(type: "text", nullable: false),
                    FullAr = table.Column<string>(type: "text", nullable: false),
                    Author = table.Column<string>(type: "text", nullable: false),
                    MetaEn = table.Column<string>(type: "text", nullable: false),
                    MetaAr = table.Column<string>(type: "text", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recommendations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NameEn = table.Column<string>(type: "text", nullable: false),
                    NameAr = table.Column<string>(type: "text", nullable: false),
                    InitialsEn = table.Column<string>(type: "text", nullable: false),
                    InitialsAr = table.Column<string>(type: "text", nullable: false),
                    TitleEn = table.Column<string>(type: "text", nullable: false),
                    TitleAr = table.Column<string>(type: "text", nullable: false),
                    TaglineEn = table.Column<string>(type: "text", nullable: false),
                    TaglineAr = table.Column<string>(type: "text", nullable: false),
                    DescriptionEn = table.Column<string>(type: "text", nullable: false),
                    DescriptionAr = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    LocationEn = table.Column<string>(type: "text", nullable: false),
                    LocationAr = table.Column<string>(type: "text", nullable: false),
                    ResumeUrl = table.Column<string>(type: "text", nullable: true),
                    HeroImageUrl = table.Column<string>(type: "text", nullable: true),
                    AvailabilityLineEn = table.Column<string>(type: "text", nullable: false),
                    AvailabilityLineAr = table.Column<string>(type: "text", nullable: false),
                    HeroHeadlineLinesEn = table.Column<string>(type: "jsonb", nullable: false),
                    HeroHeadlineLinesAr = table.Column<string>(type: "jsonb", nullable: false),
                    HeroSublineEn = table.Column<string>(type: "text", nullable: false),
                    HeroSublineAr = table.Column<string>(type: "text", nullable: false),
                    FactBarEn = table.Column<string>(type: "jsonb", nullable: false),
                    FactBarAr = table.Column<string>(type: "jsonb", nullable: false),
                    ContactIntroEn = table.Column<string>(type: "text", nullable: false),
                    ContactIntroAr = table.Column<string>(type: "text", nullable: false),
                    ContactMetaEn = table.Column<string>(type: "text", nullable: false),
                    ContactMetaAr = table.Column<string>(type: "text", nullable: false),
                    FooterCopyrightEn = table.Column<string>(type: "text", nullable: false),
                    FooterCopyrightAr = table.Column<string>(type: "text", nullable: false),
                    SocialLinks = table.Column<string>(type: "jsonb", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteConfigs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StackGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    TitleEn = table.Column<string>(type: "text", nullable: false),
                    TitleAr = table.Column<string>(type: "text", nullable: false),
                    Skills = table.Column<string>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StackGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkCases",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    NumberEn = table.Column<string>(type: "text", nullable: false),
                    NumberAr = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    StackLine = table.Column<string>(type: "text", nullable: false),
                    HeadlineEn = table.Column<string>(type: "text", nullable: false),
                    HeadlineAr = table.Column<string>(type: "text", nullable: false),
                    DescriptionEn = table.Column<string>(type: "text", nullable: false),
                    DescriptionAr = table.Column<string>(type: "text", nullable: false),
                    RepoUrl = table.Column<string>(type: "text", nullable: false),
                    PanelKind = table.Column<int>(type: "integer", nullable: false),
                    PanelDataJsonEn = table.Column<string>(type: "jsonb", nullable: false),
                    PanelDataJsonAr = table.Column<string>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkCases", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdminUsers_Email",
                table: "AdminUsers",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AlsoBuiltItems_SortOrder",
                table: "AlsoBuiltItems",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_Certifications_SortOrder",
                table: "Certifications",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_EducationEntries_SortOrder",
                table: "EducationEntries",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_Experiences_SortOrder",
                table: "Experiences",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_StackGroups_SortOrder",
                table: "StackGroups",
                column: "SortOrder");

            migrationBuilder.CreateIndex(
                name: "IX_WorkCases_SortOrder",
                table: "WorkCases",
                column: "SortOrder");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AboutContents");

            migrationBuilder.DropTable(
                name: "AdminUsers");

            migrationBuilder.DropTable(
                name: "AlsoBuiltItems");

            migrationBuilder.DropTable(
                name: "Certifications");

            migrationBuilder.DropTable(
                name: "EducationEntries");

            migrationBuilder.DropTable(
                name: "Experiences");

            migrationBuilder.DropTable(
                name: "Recommendations");

            migrationBuilder.DropTable(
                name: "SiteConfigs");

            migrationBuilder.DropTable(
                name: "StackGroups");

            migrationBuilder.DropTable(
                name: "WorkCases");
        }
    }
}
