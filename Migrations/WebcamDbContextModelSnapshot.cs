﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webcam_image_viewer;

#nullable disable

namespace webcam_image_viewer.Migrations
{
    [DbContext(typeof(WebcamDbContext))]
    partial class WebcamDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("webcam_image_viewer.Entities.GarageImage", b =>
                {
                    b.Property<int>("GarageImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("ImageDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("NumberOfCars")
                        .HasColumnType("int");

                    b.Property<string>("S3Key")
                        .HasColumnType("longtext");

                    b.HasKey("GarageImageId");

                    b.ToTable("GarageImage");
                });
#pragma warning restore 612, 618
        }
    }
}