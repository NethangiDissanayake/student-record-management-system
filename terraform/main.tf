provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "app_sg" {
  name        = "student-record-sg"
  description = "Allow SSH, HTTP, backend port"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Frontend HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend API"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami                    = "ami-0f5ee92e2d63afc18" # Ubuntu 22.04 LTS, ap-south-1
  instance_type          = "t3.micro"
  key_name               = "student-record-key"
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = {
    Name = "student-record-server"
  }
}

output "public_ip" {
  value = aws_instance.app_server.public_ip
}

