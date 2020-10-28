using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace VideoCourseAPI.Models
{
    public partial class VideoCourseDBContext : DbContext
    {
        public VideoCourseDBContext()
        {
        }

        public VideoCourseDBContext(DbContextOptions<VideoCourseDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Author> Author { get; set; }
        public virtual DbSet<AuthorCourse> AuthorCourse { get; set; }
        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserCourse> UserCourse { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>(entity =>
            {
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<AuthorCourse>(entity =>
            {
                entity.HasOne(d => d.Author)
                    .WithMany(p => p.AuthorCourse)
                    .HasForeignKey(d => d.AuthorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AuthorCourse_Author");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.AuthorCourse)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AuthorCourse_Course");
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Ignore(e => e.Authors);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.FirstName).HasMaxLength(500);

                entity.Property(e => e.LastName).HasMaxLength(500);

                entity.Property(e => e.Login).IsRequired();

                entity.Property(e => e.Password).IsRequired();
            });

            modelBuilder.Entity<UserCourse>(entity =>
            {
                entity.HasOne(d => d.Course)
                    .WithMany(p => p.UserCourse)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserCourse_Course");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserCourse)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserCourse_User");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
